import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { WeerstationService } from 'src/app/services/weerstation.service';

@Component({
  selector: 'app-weerstations-activeren',
  templateUrl: './weerstations-activeren.component.html',
  styleUrls: ['./weerstations-activeren.component.scss']
})
export class WeerstationsActiverenComponent implements OnInit {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  showModal: boolean = false;

  uniekeCode: string = "";

  activeerWeerstation$: Subscription = new Subscription();

  constructor(private router: Router, private weerstationService: WeerstationService, private toast: HotToastService) { 
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.activeerWeerstation$.unsubscribe();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    this.activeerWeerstation$ = this.weerstationService.activeerWeerstation(this.uniekeCode).pipe(
      this.toast.observe({
        loading: { content: 'Toevoegen...', position: 'bottom-right' },
        success: { content: 'Weerstation toegevoegd!', position: 'bottom-right', dismissible: true },
        error: {
          content: (e) => {
            let msg = '<ul>';
            msg += `<li><b>Er ging iets mis!</b></li>`;
            msg += `<li>Controleer of de activatiecode correct is.</li>`;
            for (let key in e.error.errors) {
              msg += `<li>${e.error.errors[key]}</li>`;
            }
            msg += '</ul>';

            return msg;
          }, position: 'bottom-right', dismissible: true, duration: 5000
        },
      })
    ).subscribe(
    result => {
        this.uniekeCode = '';
        this.closeModal();

        this.output.next(); // Send event to parent component.
    });
  }

}
