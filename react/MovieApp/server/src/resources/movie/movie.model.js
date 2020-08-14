import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    format: {
      type: String,
      required: true,
      enum: ['VHS', 'DVD', 'Blu-Ray'],
      default: 'DVD'
    },
    stars: {
      type:[{
      type: String,
      maxlength: 80
    }],
    required: true,
    trim: true,
  },
    year: {
      type: Number,
      required: true,
      min: 1800,
      max: 2100
    }
  },
  { timestamps: true }
)

movieSchema.index({ title: 1}, { unique: true })

export const Movie = mongoose.model('movie', movieSchema)
