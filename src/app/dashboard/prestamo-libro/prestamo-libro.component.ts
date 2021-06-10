import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { AlertSwallService } from 'src/app/service/alert-swall.service';
import { PrestamoService } from 'src/app/service/prestamo.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-prestamo-libro',
  templateUrl: './prestamo-libro.component.html',
  styleUrls: ['./prestamo-libro.component.css']
})
export class PrestamoLibroComponent implements OnInit {
  modalOptions: NgbModalOptions = {};
  prestamoForm: FormGroup;
  @Input() title: string;
  @Input() id: string;
  isLoading: boolean;

  librosReservados: any[] = [];
  url = environment.imgUrl;

  constructor(
    private formBuilder: FormBuilder,
    private prestamoService: PrestamoService,
    public activeModal: NgbActiveModal,
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
    this.listLibroReserba();
  }

  createForm() {
    this.prestamoForm = this.formBuilder.group({
      nombres: ['',[Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]],
      apellidos: ['',[Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]],
      ci: [''],
      grado: ['primaria'],
      curso: ['',[Validators.required, Validators.pattern('[0-9 ]*')]],
      libros: [''],
    });
  }

  register(prestamoForm: any) {
    // const formData = new FormData();

    // formData.append('nombres', prestamoForm.nombres);
    // formData.append('apellidos', prestamoForm.apellidos);
    // formData.append('ci', prestamoForm.ci);
    // formData.append('curso', prestamoForm.curso);
    // formData.append('libros', this.librosReservados);
    // console.log(formData);

    prestamoForm = { ...prestamoForm, 'libros':this.librosReservados};
    console.log(prestamoForm);


    this.isLoading = true;
    if (this.id === undefined) {
      this.prestamoService
        .create(prestamoForm)
        .pipe(
          finalize(() => {
            this.prestamoForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data => {
            this.alertSwal.showSwallSuccess(data.success);
            this.activeModal.close(data);
            this.librosReservados.splice(0,3);
            localStorage.setItem('libros', JSON.stringify(this.librosReservados));
          },
          (error: any) => {
            this.alertSwal.showSwallError(error.error);
          }
        );
    }
  }

  listLibroReserba() {
    this.librosReservados = JSON.parse(localStorage.getItem('libros'));
  }
}
