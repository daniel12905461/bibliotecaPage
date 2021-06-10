import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlertSwallService } from 'src/app/service/alert-swall.service';
import { LibroService } from 'src/app/service/libro.service';
import { environment } from 'src/environments/environment.prod';
import { CreateLibroComponent } from './create-libro/create-libro.component';

@Component({
  selector: 'app-list-libro',
  templateUrl: './list-libro.component.html',
  styleUrls: ['./list-libro.component.css']
})
export class ListLibroComponent implements OnInit {
  libros: any[];
  modalOptions: NgbModalOptions = {};
  url = environment.imgUrl;

  constructor(
    private modalService: NgbModal,
    private libroService: LibroService,
    public alertSwal: AlertSwallService
    ) { }

  ngOnInit(): void {
    console.log("ASDasdsd");
    this.list();
  }

  list() {
    this.libroService.getAll().subscribe(res => {
      this.libros = res;
      console.log("asdasdasd",res);
    });
  }

  create(){
    const modalRef = this.modalService.open(
      CreateLibroComponent,
      this.modalOptions
    );
    modalRef.componentInstance.title = 'Crear Nuevo';

    modalRef.result.then(result => {
      if (result) {
        this.list();
      }
    });
  }

  edit(id: any){
    const modalRef = this.modalService.open(
      CreateLibroComponent,
      this.modalOptions
    );
    modalRef.componentInstance.title = 'Editar';
    modalRef.componentInstance.id = id;

    modalRef.result.then(result => {
      if (result) {
        this.list();
      }
    });

  }

  eliminar(id: any){
    this.alertSwal
      .showConfirm({
        title: 'Esta seguro de eliminar?',
        text: 'la accion no podra revertirse...!',
        icon: 'warning'
      })
      .then(res => {
        // console.log(res);
        if (res.value === true) {
          this.libroService.delete(id).subscribe(
            (data: any) => {
              // console.log(res);
              this.alertSwal.showSwallSuccess(data.success);
              this.list();
            },
            (error: any) => this.alertSwal.showSwallError(error.error)
          );
        }
      });
  }

  enable(id: any) {
    this.libroService.enabled(id).subscribe(
      data => {
        this.list();
      },
      error => {
        // console.log('error ' + error);
        this.alertSwal.showSwallError(error.error);
        this.list();
      }
    );
  }

  generatePDF() {
    // console.log(this.listReportes);
    console.log(this.libros);
    const d: Date = new Date();

    // this.reportsService.clienteDaiarioPdf(this.fecha).subscribe((x: any) => {
    this.libroService
      .generarPdf(this.libros)
      .subscribe((x: any) => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        const newBlob = new Blob([x], { type: 'application/pdf' });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        const link = document.createElement('a');
        link.href = data;
        link.download = 'ReporteLibros-' + d.getTime() + '.pdf';
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          })
        );

        setTimeout(function() {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }
}
