import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spotlight',
  templateUrl: './spotlight.component.html',
  styleUrls: ['./spotlight.component.scss']
})
export class SpotlightComponent implements OnInit {
  topicHashtags = [
    {
      topic: 'ลิปสติกสำหรับสาวผิวแทน',
      info: [
        {
          detail: 'ลิปเซนทัล',
          img: 'https://backend.central.co.th/media/catalog/product/c/d/cds84013309-1.jpg'
        },
        {
          detail: 'ลิปเซนทัล',
          img: 'https://m.maccosmetics.co.th/media/export/cms/products/640x600/mac_sku_SMPP40_640x600_0.jpg'
        },
        {
          detail: 'ลิปเซนทัล',
          img: '../../../assets/lip-spotlight.jpg'
        },
      ]
    },
    {
      topic: 'รีวิวบลัชออนโทนชมพู',
      info: [
        {
          detail: 'บลัชออน',
          img: 'https://www.cosmenet.in.th/upload/iblock/575/4u2-love-me-more-300.jpg'
        },
        {
          detail: 'บลัชออน',
          img: 'https://beautykissy.com/wp-content/uploads/2020/09/MAC-Powder-Blush-On-6g-%E0%B8%AA%E0%B8%B5Melba-2.jpg'
        },
        {
          detail: 'บลัชออน',
          img: 'https://s2.konvy.com/static/team/2020/0630/2020063013280186926.jpg'
        },
      ]
    },
    {
      topic: 'แต่งหน้าสไตล์เกาหลี',
      info: [
        {
          detail: 'แต่งหน้า',
          img: 'https://files.vogue.co.th/uploads/makeup_look_for_a_night_out1.jpeg'
        },
        {
          detail: 'แต่งหน้า',
          img: 'https://women.mthai.com/app/uploads/2018/08/makeup_office17.jpg'
        },
        {
          detail: 'แต่งหน้า',
          img: 'https://www.akerufeed.com/wp-content/uploads/2019/12/1-14.jpg'
        },
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
