import { Injectable, inject } from "@angular/core";
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class NgxDcFileService {
  private http = inject(HttpClient);


  public async uploadFile(url: string, fileKey: string, fileToUpload: File, additionalKeys?: any): Promise<any> {
    const formData: FormData = new FormData()
    formData.append(fileKey, fileToUpload, fileToUpload.name)
    Object.keys(additionalKeys || {}).forEach(key => {
      formData.append(key, additionalKeys[key])
    })
    return firstValueFrom(this.http.post(url, formData))
  }

  public async openFileInNewTab(fileUrl: string, isPdf = false) {
    const response = await firstValueFrom(this.http.get(fileUrl, { responseType: 'blob', headers: isPdf ? { Accept: 'application/pdf'} : {} }))
    const dataType = response.type
    const binaryData = []
    binaryData.push(response)
    const data = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }))
    const pdfWindow = window.open()
    pdfWindow.location.href = data
    pdfWindow.onload = () => {
      setTimeout(() => {
        pdfWindow.document.title = 'pdf'
      }, 500)
    }
    document.getElementById('overlay').style.display = 'none'
  }

  public async openFileInNewTabFromFile(file: File) {
    const pdfWindow = window.open()
    pdfWindow.location.href = window.URL.createObjectURL(file)
    pdfWindow.onload = () => {
      setTimeout(() => {
        pdfWindow.document.title = 'pdf'
      }, 500)
    }
    document.getElementById('overlay').style.display = 'none'
  }

  public async downloadFileLocal(file: File): Promise<any> {
    let downloadLink = document.createElement('a')
    downloadLink.href = window.URL.createObjectURL(file)
    downloadLink.setAttribute('download', `${file.name}`)
    document.body.appendChild(downloadLink)
    downloadLink.click()
    downloadLink.remove()
  }

  public async downloadFile(saveAsFileName: string, fileUrl: string, ext: string = 'pdf'): Promise<any> {
    const response = await firstValueFrom(this.http.get(fileUrl, { responseType: 'blob', headers: ext === 'pdf' ? { Accept: 'application/pdf'} : {} }))
    let binaryData = []
    binaryData.push(response)
    let downloadLink = document.createElement('a')
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}))
    downloadLink.setAttribute('download', `${saveAsFileName}.${ext}`)
    document.body.appendChild(downloadLink)
    downloadLink.click()
    downloadLink.remove()
  }
}
