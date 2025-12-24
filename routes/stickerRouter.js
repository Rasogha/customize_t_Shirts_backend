import express from 'express'
import { addSticker, getStickers, deleteSticker  } from '../controllers/stickerController.js'

const stickerRouter = express.Router()

stickerRouter.post('/', addSticker)
stickerRouter.get('/', getStickers)
stickerRouter.delete('/:id', deleteSticker)

export default stickerRouter