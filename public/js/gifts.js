class GiftItems {
  constructor(itemType, value, speed, giftImg) {
    this.x = random(width_);
    this.y = 20;
    this.itemType = itemType;
    this.value = value;
    this.speed = speed;
    this.giftImg = giftImg;
    this.width = 74.14 - 20; // 20 - padding, 74.14 - original width
    this.height = 20 + 71.17; // 20 - padding, 71.17 - original height
  }

  move() {
    this.y += this.speed;
  }

  display() {
    image(this.giftImg, this.x, this.y);
    text(`+${this.value}%`, this.x + this.width / 2, this.y + this.height);
  }
}

class HealthGift extends GiftItems {
  value = random([20, 50, 70, 100]);
  speed = 3;
  constructor() {
    super("health", HealthGift.value, HealthGift.speed, healthGiftImg);
  }
  t;
}
