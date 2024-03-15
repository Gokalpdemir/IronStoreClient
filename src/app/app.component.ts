import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $ :any




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private toastrService:CustomToastrService){  }
  title = 'ETicaretClient';
  ngOnInit(): void {
    
  }
  
}
// $.get("https://localhost:7040/api/Products",data=>{
//   console.log(data)
// })
