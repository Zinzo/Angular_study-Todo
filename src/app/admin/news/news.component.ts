import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";
import {NewsVO} from "../../domain/news.vo";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList: NewsVO[];
  constructor( private adminService: AdminService) { }

  ngOnInit() {
    const params = {
      start_index : 0,
      page_size: 5
    };

    this.adminService.findNews(params)
      .subscribe(body => {
        console.log(body);

        this.newsList = body.data;
      });
  }



}
