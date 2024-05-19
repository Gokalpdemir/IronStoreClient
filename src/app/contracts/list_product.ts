import { List_Category } from "./Category/list-category";
import { List_Product_Image } from "./list_product_image";

export class List_Product{
id:string    
name:string;
stock:number;
price:number;
createdDate:Date;
updatedDate:Date;
productImageFiles?:List_Product_Image[];
imagePath:string;
categoryName:string;

}

