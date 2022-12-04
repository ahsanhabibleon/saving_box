import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCategoryList(){
    let list: any;
    this.http.get('https://thesavingsbox.com/api/chat-server/public/api/get-categories').subscribe((res: any)=>{
      if(res.status == 200){
        console.log(res);
        list = res.data.categories;
        console.log(list);
      }
    },err=>{
      console.log(err);
    });
    return of(list);
  }

  getProductList(){
    const list = [
      {
        id: 1,
        name: 'Red MI 1 Sea Blue 64 GB',
        details: '4 GB', rating: 3,
        price: 150, currency: '$',
        //desc:'Redmi 9 comes with Octa-core Helio G35 processor and upto 2.3GHz clock speed. It also comes with 13+2MP Dual AI Rear camera along with 5 MP front camera. Redmi 9 also features 16.58 centimeters (6.53-inch) HD + display with 720x1600 pixels. It also comes with 5000 mAH large battery and Fingerprint sensor'
      },
      {
        id: 2,
        name: 'Red MI 2 Sea Blue 64 GB',
        details: '4 GB', rating: 4,
        price: 185, currency: '$',
       // desc:'Redmi 9 comes with Octa-core Helio G35 processor and upto 2.3GHz clock speed. It also comes with 13+2MP Dual AI Rear camera along with 5 MP front camera. Redmi 9 also features 16.58 centimeters (6.53-inch) HD + display with 720x1600 pixels. It also comes with 5000 mAH large battery and Fingerprint sensor'
      },
      {
        id: 3,
        name: 'Red MI 3 Sea Blue 64 GB',
        details: '4 GB', rating: 5,
        price: 190, currency: '$',
        //desc:'Redmi 9 comes with Octa-core Helio G35 processor and upto 2.3GHz clock speed. It also comes with 13+2MP Dual AI Rear camera along with 5 MP front camera. Redmi 9 also features 16.58 centimeters (6.53-inch) HD + display with 720x1600 pixels. It also comes with 5000 mAH large battery and Fingerprint sensor'
      },
      {
        id: 4,
        name: 'Red MI 4 Sea Blue 64 GB',
        details: '4 GB', rating: 4,
        price: 180, currency: '$',
        //desc:'Redmi 9 comes with Octa-core Helio G35 processor and upto 2.3GHz clock speed. It also comes with 13+2MP Dual AI Rear camera along with 5 MP front camera. Redmi 9 also features 16.58 centimeters (6.53-inch) HD + display with 720x1600 pixels. It also comes with 5000 mAH large battery and Fingerprint sensor'
      },
      {
        id: 5,
        name: 'Red MI 5 Sea Blue 64 GB',
        details: '4 GB', rating: 4,
        price: 250, currency: '$',
        //desc:'Redmi 9 comes with Octa-core Helio G35 processor and upto 2.3GHz clock speed. It also comes with 13+2MP Dual AI Rear camera along with 5 MP front camera. Redmi 9 also features 16.58 centimeters (6.53-inch) HD + display with 720x1600 pixels. It also comes with 5000 mAH large battery and Fingerprint sensor'
      },
      {
        id: 6,
        name: 'Red MI 6 Sea Blue 64 GB',
        details: '4 GB', rating: 3,
        price: 200, currency: '$',
        //desc:'Redmi 9 comes with Octa-core Helio G35 processor and upto 2.3GHz clock speed. It also comes with 13+2MP Dual AI Rear camera along with 5 MP front camera. Redmi 9 also features 16.58 centimeters (6.53-inch) HD + display with 720x1600 pixels. It also comes with 5000 mAH large battery and Fingerprint sensor'
      },
      {
        id: 7,
        name: 'Red MI 7 Sea Blue 64 GB',
        details: '4 GB', rating: 4,
        price: 210, currency: '$',
       // desc:'Redmi 9 comes with Octa-core Helio G35 processor and upto 2.3GHz clock speed. It also comes with 13+2MP Dual AI Rear camera along with 5 MP front camera. Redmi 9 also features 16.58 centimeters (6.53-inch) HD + display with 720x1600 pixels. It also comes with 5000 mAH large battery and Fingerprint sensor'
      },
      {
        id: 8,
        name: 'Red MI 8 Sea Blue 64 GB',
        details: '4 GB', rating: 5,
        price: 250, currency: '$',
        //desc:'Redmi 9 comes with Octa-core Helio G35 processor and upto 2.3GHz clock speed. It also comes with 13+2MP Dual AI Rear camera along with 5 MP front camera. Redmi 9 also features 16.58 centimeters (6.53-inch) HD + display with 720x1600 pixels. It also comes with 5000 mAH large battery and Fingerprint sensor'
      }
    ];
    return of(list);
  }
}
