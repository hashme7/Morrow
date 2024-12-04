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
exports.Cloudinary = void 0;
const morrow_common_1 = require("morrow-common");
const cloudinary_1 = require("cloudinary");
class Cloudinary {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: morrow_common_1.environmentVariables.CLOUDINARY_NAME,
            api_key: morrow_common_1.environmentVariables.CLOUDINARY_APIKEY,
            api_secret: morrow_common_1.environmentVariables.CLOUDINARY_APISECRET,
        });
    }
    uploadImage(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uploadedImg = cloudinary_1.v2.uploader.upload(filePath, {
                    upload_preset: "morrow-avatars",
                    public_id: `avatar`,
                    allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "webm"],
                }, (error, result) => {
                    if (error) {
                        throw error;
                    }
                    console.log(result);
                    return result;
                });
                return uploadedImg;
            }
            catch (error) {
                console.log(`Error on uploading image to cloudinary :${error}`);
                throw new Error(`Cloudinary upload failed: ${error}`);
            }
        });
    }
}
exports.Cloudinary = Cloudinary;
