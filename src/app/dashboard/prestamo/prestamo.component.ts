import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertSwallService } from 'src/app/service/alert-swall.service';
import { PrestamoService } from 'src/app/service/prestamo.service';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {
  prestamos: any[];
  devoluciones: any[];
  historial: any[];

  constructor(
    private modalService: NgbModal,
    private prestamoService: PrestamoService,
    public alertSwal: AlertSwallService
  ) { }

  ngOnInit(): void {
    this.prestamoService.getAll().subscribe(res => {
      this.historial = res;
      console.log("historial",res);
    });
    this.listPrestamos();
    this.listDevoluciones();
  }

  listPrestamos() {
    this.prestamoService.getPrestamos().subscribe(res => {
      this.prestamos = res;
      console.log("prestamos",res);
    });
  }

  listDevoluciones() {
    this.prestamoService.getDevoluciones().subscribe(res => {
      this.devoluciones = res;
      console.log("devoluciones",res);
    });
  }

  estadoPrestamo(estado: any){
    if(estado == '1'){
      return 0;
    }
    return 1;
  }

  estadoDevolucion(estado: any){
    if(estado == '2'){
      return 0;
    }
    return 1;
  }

  enablePrestamo(id: any) {
    this.prestamoService.prestar(id).subscribe(
      data => {
        this.listPrestamos();
        this.listDevoluciones();
        console.log(data);
      },
      error => {
        // console.log('error ' + error);
        this.alertSwal.showSwallError(error.error);
        this.listPrestamos();
        this.listDevoluciones();
      }
    );
  }

  enableDevoluciones(id: any) {
    this.prestamoService.devolber(id).subscribe(
      data => {
        this.listPrestamos();
        this.listDevoluciones();
        console.log(data);
      },
      error => {
        // console.log('error ' + error);
        this.alertSwal.showSwallError(error.error);
        this.listPrestamos();
        this.listDevoluciones();
      }
    );
  }
}
