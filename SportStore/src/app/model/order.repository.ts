import { Injectable } from "@angular/core";
import { Order } from "./order.model";
//import { StaticDataSource } from "./static.datasource";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class OrderRepository {
    private orders: Order[] = [];
    private loaded: boolean = false;

    //constructor(private dataSource: StaticDataSource) { }

    constructor(private dataSource: RestDataSource) { }

    getOrders(): Order[] {
        if(!this.loaded) {
            this.loadOrders();
        }
        return this.orders
    }

    saveOrder(order: Order): Observable<Order> {
        this.loaded = false;
        return this.dataSource
            .saveOrder(order);
    }

    updateOrder(order: Order) {
        this.dataSource.updateOrder(order)
            .subscribe(ord => {
                this.orders.splice(this.orders.findIndex(o => o.id == ord.id), 1, ord);
            });
    }

    deleteOrder(id: number) {
        this.dataSource.deleteOrder(id)
            .subscribe(ord => {
                this.orders.splice(this.orders.findIndex(o => o.id == id), 1);
            });
    }

    loadOrders() {
        this.loaded = true;
        this.dataSource.getOrders()
            .subscribe(o => this.orders = o);
    }
}