import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-weerstation-dashboard-location',
  templateUrl: './weerstation-dashboard-location.component.html',
  styleUrls: ['./weerstation-dashboard-location.component.scss']
})

export class WeerstationDashboardLocationComponent implements OnInit, AfterViewInit {
  @Input() title!: string;

  map: any;
  
  showModal: boolean = false;

  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 12, 41 ],
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png'
    })
  };

  coordinatesArray: number[] = [];

  weerstation!: Weerstation;
  meting!: any;
  getLaatsteMeting$: Subscription = new Subscription();
  routeParams$: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private authWeerstationService: WeerstationService) {
    
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.getCoordinates();
  }

  getCoordinates() {
    this.routeParams$ = this.route.params.subscribe(
      params => {
        this.getLaatsteMeting$= this.authWeerstationService.getLaatsteMeting(params['id']).subscribe(
          (result: any) => {
            this.meting = result;

            this.initMap();
            console.log(result);
            
          }
        );
      }
    );
  }
  
  private initMap(): void {
    //const map = L.map("map").setView([this.coordinatesArray], 15);
    const map = L.map("map").setView([this.meting.gla, this.meting.glo], 15);
    //const map = L.map("map").setView([50, 4.98917], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([this.meting.gla, this.meting.glo], this.icon).addTo(map);
    marker.bindPopup("" + this.weerstation.naam);    
    
  }

  openModal(){
    this.showModal = true;
  }

  closeModal(){
    this.showModal = false;
  }

}