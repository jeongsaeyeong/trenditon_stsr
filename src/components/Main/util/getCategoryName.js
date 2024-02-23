import { categoryData } from "../categoryData"
export function getCategoryName(categoryId){
    const categoryname= categoryData.find((category)=> category.categoryId === categoryId)
    return categoryname?categoryname.categoryName:''
}