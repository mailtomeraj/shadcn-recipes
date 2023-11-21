import Image from 'next/image'
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Vegan } from 'lucide-react';
interface Recipe {
  userId: number;
  id: number;
  title: 'string'
  time: number
  description: 'string'
  vegan: boolean
  image:string
 
} 279916
async function getReacipes(): Promise<Recipe[]> {
  const result = await fetch('http://localhost:4000/recipes')
  //delay response
  await new Promise((resolve) => setTimeout(resolve,3000))
  return result.json()

}
export default async function Home() {
  const recipes = await getReacipes()
  return (
    <main className=" max-w-6xl mx-auto">
      <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {
          recipes.map(recipe => (
            <Card key={recipe.id} className='flex flex-col justify-between'>
          
              <CardHeader className='flex flex-row gap-4 items-center'>
          
              <Avatar>
  <AvatarImage src={`../images/${recipe.image}`} />
  <AvatarFallback>{recipe.title.slice(0,2)}</AvatarFallback>
</Avatar>
<div>
      <CardTitle className="leading-tight">{recipe.title}</CardTitle>
           
                  <CardDescription>{recipe.time} mins to cook.</CardDescription>
                  </div>                 
              </CardHeader>
             
              <CardContent>
                <p>{recipe.description}</p>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button className='bg-purple-400'>View Recipe</Button>
                {recipe.vegan && <Badge variant="secondary" className=' text-white bg-green-500 hover:text-green-500'>Vegan!</Badge>}
              </CardFooter>
            </Card>
          )
          )
        }
      </div>
    </main>
  )
}
