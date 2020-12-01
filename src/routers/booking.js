const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const angularAuth = require('../middleware/angularAuth')
const auth= require('../middleware/auth')
const generator = require('generate-password');

router.post(`/booking`, angularAuth, auth, async (req, res) => {
// resetting arrive and depart times
// Ckeck-in time is at 14:00
// Check-out time is at 12:00
    let arriveDateTurkey = new Date(req.body.arriveDate)
    let departDateTurkey = new Date(req.body.departDate)
    req.body.arriveDate = arriveDateTurkey.setTime(arriveDateTurkey.getTime() + (17*60*60*1000))
    req.body.departDate = departDateTurkey.setTime(departDateTurkey.getTime() + (15*60*60*1000))

    let password = generator.generate({
    length: 10,
    numbers: true
});

    const user = new User(req.body)
    user.hotelName = req.user.hotelName
    user.password = password
    console.log(password)

    try{
        await user.save()
        console.log(user)
        const token = await user.generateAuthToken()
        //res.status(201).send({user, token})
    } catch (e)  {
        console.log(e)
        res.status(400).send(e)
    }
})

router.patch(`/booking`, angularAuth, auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'name' ,'email', 'password', 'arriveDate', 'departDate', 'roomNumber', 'lockStatus']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(404).send({ error : 'Invalid Update' })
    }

    const booking = await User.findOne({email: req.body.email, hotelName: req.user.hotelName})

    if (req.body.arriveDate){
        let arriveDateTurkey = new Date(req.body.arriveDate)
        req.body.arriveDate = arriveDateTurkey.setTime(arriveDateTurkey.getTime() + (17*60*60*1000))
    }

    if (req.body.departDate){
        let departDateTurkey = new Date(req.body.departDate)
        req.body.departDate = departDateTurkey.setTime(departDateTurkey.getTime() + (15*60*60*1000))
    }

    if (!booking){
        return res.status(404).send({error: `booking not found`})
    }

    try{
        updates.forEach((update) => booking[update] = req.body[update])
        await booking.save()
        res.send(booking)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete(`/booking/:email`, angularAuth, auth, async(req, res) => {
    const booking = await User.findOne({email: req.params.email})

    if (!booking){
        return res.status(404).send({error: 'Booking not found'})
    }
    try{
        await booking.remove()
        res.send(booking)
    }catch(e){
        res.status(500).send()
    }
})

router.get(`/booking`, angularAuth, auth,async(req, res) => {
    let guests = []
    let guestsObj = {}
    const allGuests = await User.find({hotelName: req.user.hotelName})
    let id = 0;
        for (guest of allGuests){
            if (guest.account === 'guest'){
                  guestsObj = guest
                  id++
                  guestsObj.id = id
                  guests.push(guestsObj)
                  guestsObj = {}
            }
        }
        res.status(200).json(guests)
})

router.get(`/todaysCheckIn`, angularAuth, auth, async(req, res) => {
    allHotelBookings = await User.find({hotelName: req.user.hotelName})
    todaysCheckIn = []
    let id = 0
    for (booking of allHotelBookings){
        let checkInDay = new Date(booking.arriveDate)
        let today = new Date()
        checkInFormatYMD = JSON.stringify(checkInDay).slice(1, 11);
        todayFormatYMD = JSON.stringify(today).slice(1, 11);

        if (checkInFormatYMD === todayFormatYMD){
            todaysCheckIn.push(booking)
            id++
         }

        }

        res.status(200).json(todaysCheckIn)
})

router.get(`/bookingStatistics`, angularAuth, auth, async(req, res) => {
    let hotelName = req.user.hotelName
    let checkInCounter = 0
    let checkOutCounter = 0
    let today = new Date()
    let todayFormatYMD = JSON.stringify(today).slice(1, 11)

    allBookings = await User.find({hotelName})
    for (booking of allBookings){
        let checkInDay = new Date(booking.arriveDate)
        let checkInFormatYMD = JSON.stringify(checkInDay).slice(1,11)
        let checkOutDay = new Date(booking.departDate)
        let checkOutFormatYMD = JSON.stringify(checkOutDay).slice(1, 11)

        if (checkInFormatYMD === todayFormatYMD){
            checkInCounter++
        }

        if (checkOutFormatYMD === todayFormatYMD){
             checkOutCounter++
        }

    }
    console.log(`todays check-in is: ${checkInCounter}`)
    console.log(`Todays check-out is: ${checkOutCounter}`)
    res.status(200).json([{checkInCounter},{checkOutCounter}])
//    2.Get Get todaysCheckIn.
//    3.Get Todays CheckOUt.
//    4.Get All Booking
})

router.get(`/todaysCheckOut`, angularAuth, auth, async(req, res) => {
    allHotelBookings = await User.find({hotelName: req.user.hotelName})
    todaysCheckOut = []
    let id = 0
    for (booking of allHotelBookings){
        let checkOutDat = new Date(booking.departDate)
        let today = new Date()
        checkOutFormatYMD = JSON.stringify(checkOutDat).slice(1, 11);
        todayFormatYMD = JSON.stringify(today).slice(1, 11);

        if (checkOutFormatYMD === todayFormatYMD){
            todaysCheckOut.push(booking)
            id++

         } else{
            console.log(`can not check-in `)

        }
        }
       // allTodaysCheckIn.push({checkInCounter:id})
        console.log(todaysCheckIn)

        res.status(200).json(todaysCheckIn)

})

module.exports = router