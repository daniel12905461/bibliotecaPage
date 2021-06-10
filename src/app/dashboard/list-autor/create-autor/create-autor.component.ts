import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { AlertSwallService } from 'src/app/service/alert-swall.service';
import { AutorService } from 'src/app/service/autor.service';

@Component({
  selector: 'app-create-autor',
  templateUrl: './create-autor.component.html',
  styleUrls: ['./create-autor.component.css']
})
export class CreateAutorComponent implements OnInit {
  modalOptions: NgbModalOptions = {};
  autorForm: FormGroup;
  @Input() title: string;
  @Input() id: string;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public autorService: AutorService,
    public alertSwal: AlertSwallService
  ) {
    this.modalOptions = {
      size: 'lg',
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit(): void {
    this.createForm();
    if (this.id !== undefined) {
      this.autorService.getById(this.id).subscribe(data => {
        this.autorForm.setValue({
          nombre: data.nombre
        });
      });
    }
  }

  createForm() {
    this.autorForm = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]]
    });
  }

  register(autorForm: any) {
    this.isLoading = true;
    if (this.id === undefined) {
      this.autorService
        .create(autorForm)
        .pipe(
          finalize(() => {
            this.autorForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data => {
            this.alertSwal.showSwallSuccess(data.success);
            this.activeModal.close(data);
          },
          (error: any) => {
            this.alertSwal.showSwallError(error.error);
          }
        );
    } else {
      this.autorService
        .update(this.id, autorForm)
        .pipe(
          finalize(() => {
            this.autorForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data3 => {
            this.alertSwal.showSwallSuccess(data3.success);
            this.activeModal.close(data3);
          },
          (error: any) => {
            this.alertSwal.showSwallError(error.message);
          }
        );
    }
  }
}
