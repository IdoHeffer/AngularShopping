import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  constructor() { }

//   public saveTextAsFile(data, filename) {

//   if (!data) {
//     console.error('Console.save: No data')
//     return;
//   }

//   if (!filename) filename = 'console.json'

//   var blob = new Blob([data], { type: 'text/plain' }),
//     e = document.createEvent('MouseEvents'),
//     a = document.createElement('a')
//   // FOR IE:

//   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
//     window.navigator.msSaveOrOpenBlob(blob, filename);
//   }
//   else {
//     var e = document.createEvent('MouseEvents'),
//       a = document.createElement('a');

//     a.download = filename;
//     a.href = window.URL.createObjectURL(blob);
//     a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
//     e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//     a.dispatchEvent(e);
//   }
// }


// public expFile() {
//   var fileText = "I am the first part of the info being emailed.\r\nI am the second part.\r\nI am the third part.";
//   var fileName = "newfile001.txt"
//   this.saveTextAsFile(fileText, fileName);
// }




ngOnInit() {
}

}
