import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import * as L from 'leaflet';


@Component({
  selector: 'app-weerstation-dashboard-location',
  templateUrl: './weerstation-dashboard-location.component.html',
  styleUrls: ['./weerstation-dashboard-location.component.scss']
})

export class WeerstationDashboardLocationComponent implements OnInit {
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

  weerstation!: Weerstation;
  
  ngAfterViewInit(): void {
    this.initMap();
    console.log("afterview");
    
  }

  ngOnInit(): void {
    
  }

  private initMap(): void {
    const map = L.map("map").setView([51.16557, 4.98917], 15);
    //const map = L.map("map").setView([50, 4.98917], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

  
    const marker = L.marker([51.17217122414885,4.995923016103898], this.icon).addTo(map);
    marker.bindPopup("" + this.weerstation.naam);

    console.log("initmap");
    
    
  }

  openModal(){
    this.showModal = true;
  }

  closeModal(){
    this.showModal = false;
  }

}