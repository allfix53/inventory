### INVENTORY SERVER

Repo ini berhubungan dengan order server (https://github.com/allfix53/order) dan bertugas untuk mengelola data product dan coupon

**stack**
expressJs - mongo

**collections**
***coupon***

1. code: kodu kupon yang bisa di apply oleh customer
2. validFrom: batas awal coupon dapat digunakan
3. validTo: batas akhir coupon dapat digunakan
4. value: nilai diskon. Jika value berupa number dan berakhiran % maka nilai diskon berupa prosentase, jika tidak maka bernilai angka
5. limit: jumlah maksimum yang dapat di apply

***product***

1. name: nama product
2. price: harga satuan
3. qty: ready stock product
