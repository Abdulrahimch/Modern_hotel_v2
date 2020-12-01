const RoleSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    RoleId: {
        type: String,
        required: true,
        trim: true
    }
})