export interface CloudinaryUploadResponse {
    public_id: string;        // Unique identifier for the uploaded file
    url: string;              // URL of the uploaded asset
    secure_url: string;       // HTTPS URL of the uploaded asset
    format: string;           // File format (e.g., "jpg", "png")
    resource_type: string;    // Type of resource (e.g., "image", "video")
    width: number;            // Width of the image
    height: number;           // Height of the image
    bytes: number;            // Size in bytes
    created_at: string;       // Timestamp of the upload
    [key: string]: any;       // Allow additional properties
  }
export interface ICloudinary{
    uploadImage(filepath:string):Promise<CloudinaryUploadResponse>
}


  