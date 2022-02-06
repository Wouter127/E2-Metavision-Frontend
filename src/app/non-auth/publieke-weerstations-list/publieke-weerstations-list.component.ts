import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-publieke-weerstations-list',
  templateUrl: './publieke-weerstations-list.component.html',
  styleUrls: ['./publieke-weerstations-list.component.scss']
})
export class PubliekeWeerstationsListComponent implements OnInit {

  loading: boolean = true;

  organisatie!: any;
  organisatie$: Subscription = new Subscription();
  weerstations: any[] =[];

  constructor(private weerstationService: WeerstationService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
    this.getWeerstations();
  }

  getWeerstations() {
    this.weerstationService.getPubliekeWeerstations().subscribe(
      result => {
        this.loading=false;
        this.weerstations = result;
      },  error => {
        this.toast.error("Er ging iets mis. De weerstations kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    )
  }

}
