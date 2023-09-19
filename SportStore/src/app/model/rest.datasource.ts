import { Component, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from "rxjs";
import { Product } from "./product.model";
import { Order } from "./order.model";

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    auth_token?: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "products");
    }

    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + "orders", order);
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this.http
            .post<any>(this.baseUrl + 'login', {name: user, password: pass})
            .pipe(map(res => {
                this.auth_token = res.success ? res.token : null;
                return res.success;
            }));
    }
}