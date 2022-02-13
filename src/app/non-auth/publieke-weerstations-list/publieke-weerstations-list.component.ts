import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeerstationService } from 'src/app/services/weerstation.service';
import { HotToastService } from '@ngneat/hot-toast';
import { LocationService } from 'src/app/services/location.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-publieke-weerstations-list',
  templateUrl: './publieke-weerstations-list.component.html',
  styleUrls: ['./publieke-weerstations-list.component.scss']
})
export class PubliekeWeerstationsListComponent implements OnInit {

  loading: boolean = true;

  map: any;
  icon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png'
    })
  };

  weerstations: any[] =[];

  getLaatsteMeting$: Subscription = new Subscription();
  getReverseGeocoding$: Subscription = new Subscription();

  constructor(private weerstationService: WeerstationService, private toast: HotToastService, private locationService: LocationService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.getWeerstations();
  }

  initMap(): void {
    this.map = L.map('leafletmap', {
      center: [50.8476, 4.3572],
      zoom: 8
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  getWeerstations() {
    this.weerstationService.getPubliekeWeerstations().subscribe(
      result => {
        let weerstationsLaatsteMeting: any = result;
        weerstationsLaatsteMeting.map((w: any) => w.laatsteMeting = 'loading');

        this.loading=false;
        this.weerstations = weerstationsLaatsteMeting;

        weerstationsLaatsteMeting.forEach((weerstation: any) => {
          this.getLaatsteMeting$ = this.weerstationService.getLaatsteMeting(weerstation.id).subscribe(
            result => {
              if (result) {
                weerstationsLaatsteMeting.find((w: any) => w.id === weerstation.id).laatsteMeting = { ...result, location: '' };
                this.addLocation(weerstation.id, result.gla, result.glo);        
                this.addMarker(weerstation.id, result.gla, result.glo, weerstation.organisatie.naam, weerstation.naam);
                this.weerstations = weerstationsLaatsteMeting;
              }
              else {
                weerstationsLaatsteMeting.find((w: any) => w.id === weerstation.id).laatsteMeting = null;
                this.weerstations = weerstationsLaatsteMeting;
              }
            }
          )
        });
      },  error => {
        this.toast.error("Er ging iets mis. De weerstations kunnen niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    )
  }

  addLocation(id: number, latitude: string, longitude: string): void {
    this.getReverseGeocoding$ = this.locationService.reverseGeocoding(latitude, longitude).subscribe(
      result => {
        this.weerstations.find((w: any) => w.id === id).laatsteMeting.location = result.address.country + (result.address.town ? ", " + result.address.town : '');
      },
      error => {
        // this.toast.error("Er ging iets mis.  De locatie van het weerstation kon niet worden opgehaald.", { position: 'bottom-right', dismissible: true, autoClose: false });
      }
    );
  }

  addMarker(weerstationId: number, latitude: number, longitude: number, organisatieNaam: string, weerstationNaam: string): void {
    var tooltip = L.tooltip({ opacity: 0.9, offset: L.point({ x: 10, y: -20 }) }).setContent(`<p><b>${weerstationNaam}</b></br>${organisatieNaam}</p>`);
    L.marker([latitude, longitude], this.icon).bindTooltip(tooltip).addTo(this.map).on('click', function (e) {
      Array.from(document.getElementsByClassName('border-wbRed-500')).forEach(
        (element, index, array) => {
          element.classList.remove('border-wbRed-500');
        }
      );

      var el = document.getElementById(weerstationId.toString());
      el?.classList.add('border-wbRed-500');
      el?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
