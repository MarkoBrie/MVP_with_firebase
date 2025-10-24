import { inject, Injectable } from "@angular/core";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@angular/fire/storage";
//import { ImageCompressService } from "./image_compress.service";


@Injectable({
  providedIn: "root",
})
export class ImageService {

  //imageCompress = inject(ImageCompressService);
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
      const storage = getStorage();
      const dest = path + "/" + fileName;
      const storageRef = ref(storage, dest);
      uploadBytes(storageRef, file, {
        cacheControl: "public, max-age=31536000, immutable",
      }).then((value) => {
        uploadEvent({
          event: value,
          path: dest,
        });
      });
    }
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