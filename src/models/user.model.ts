import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: [String],
        enum: ["Superadmin", "Admin", "Developer", "Member"],
        default: ["Member"],
    },

    displayName: { type: String, trim: true },
    avatar: { type: String },
    gender: {
        type: String,
        enum: ["ชาย", "หญิง", "ไม่ระบุ"],
        default: "ไม่ระบุ"
    },
    birthDate: { type: Date },
    bio: { type: String },
    website: { type: String },

    lastLoginAt: { type: Date },
    auditLogs: [
        {
            loginAt: { type: Date, default: Date.now },
            ip: String,
            userAgent: String,
        }
    ],
}, { timestamps: true });

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.models.User || mongoose.model("User", userSchema); 