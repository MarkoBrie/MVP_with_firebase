import { inject, Injectable } from "@angular/core";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@angular/fire/storage";
import { ImageCompressService } from "./image_compress";


@Injectable({
  providedIn: "root",
})
export class ImageService {

  imageCompress = inject(ImageCompressService);
  logStats = true;


  constructor() {}

  /**
   *This loads the file to storage.
   *
   * @param path base path
   * @param file
   * @param uploadEvent
   */
  private uploadFile(path: string, file: File, fileName:string, uploadEvent:any) {
    if (file) {
      this.compress(file, (name:string,compressed:File) => {
        const storage = getStorage();
        const dest = path + "/compressed/" + name;
        const storageRef = ref(storage, dest);
        uploadBytes(storageRef, compressed, {
          cacheControl: "public, max-age=31536000, immutable",
        }).then((value) => {
          uploadEvent({
            event: value,
            path: dest,
          });
        });
      })
      }
  }

  compress(file:File, callback:Function){
        this.imageCompress
      .compress(file, {
        maxMP: 0.6, // ~2.5 megapixels
        maxW: 1200,
        maxH: 1200, // also cap long edges (optional)
        quality: 0.8, // starting point
        preferWebP: true, // will pick JPEG if smaller
        flatten: true, // paint white behind transparent images
        targetBytes: 120_000, // aim for ≤ ~342 KB (optional)
        minQuality: 0.32, // don't go below this in the search
      })
      .then((result) => {
        console.log("IN  ", (result.originalBytes / 1024).toFixed(1), "KB");
        console.log(
          "OUT ",
          (result.finalBytes / 1024).toFixed(1),
          "KB",
          result.mime,
          result.width,
          "x",
          result.height
        );
        const name = crypto.randomUUID() + ".webp";//can it not be a webp?
        callback(name, result.file)
      });
  }

  /**
   * This is the method called by you
   *
   * @param filePath
   * @param file
   * @param done
   */
  saveImage(filePath:string, file:any, fileName:string, done:Function) {
    this.uploadFile(filePath, file, fileName, (result:any) => {//save
      this.getImageURL( //get reference url
        result.path,
        (imageURL:string) => {
          done(imageURL);//return it
        },
        (error:any) => {
          console.error(error);//return pain
        }
      );
    });
  }

  /**
   * This gets us the path/url we can use to view our image.
   * @param path to load from
   * @param done the returned usable url
   * @param error the returned unusable error
   */
  private getImageURL(path:string, done:Function, error:Function) {
    const storage = getStorage();
    const imageRef = ref(storage, path);
    getDownloadURL(imageRef).then(
      (imageURL) => {
        done(imageURL);
      },
      (onDamn) => {
        error(onDamn);
      }
    );
  }
}