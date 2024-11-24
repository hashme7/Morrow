"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateImage = void 0;
class UpdateImage {
    constructor(repository, cloudinary) {
        this.repository = repository;
        this.cloudinary = cloudinary;
        this.repository = repository;
        this.cloudinary = cloudinary;
    }
    execute(img, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uploadedImg = yield this.cloudinary.uploadImage(img);
                const updatedUser = yield this.repository.updateImage(uploadedImg.public_id, userId);
                if (updatedUser) {
                    return { status: 204, data: updatedUser, message: 'image updated succesfully' };
                }
                else {
                    return { status: 404, message: "user not found" };
                }
            }
            catch (error) {
                console.log(`Error on udpate image usecases ${error}`);
                throw new Error(`Error on udpate image usecases ${error}`);
            }
        });
    }
}
exports.UpdateImage = UpdateImage;
