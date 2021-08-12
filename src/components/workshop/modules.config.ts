export interface WorkshopModuleData {
  index: number;
  thumb: string;
  image: string;
  title: string;
  subTitle: string;
  content: string;
}

const config: WorkshopModuleData[] = [
  {
    index: 1,
    image: '/images/cancionistica-3.jpg',
    thumb: '/images/cancionistica-3.jpg',
    title: 'Modulo 1',
    subTitle: 'Subtítulo Modulo 1',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dicta placeat numquam velit ex officia dolore quia inventore, tenetur provident sapiente quos quidem vitae repellat doloribus! Veritatis quasi quis eaque.'
  },
  {
    index: 2,
    image: '/images/cancionistica-4.png',
    thumb: '/images/cancionistica-4.png',
    title: 'Modulo 2',
    subTitle: 'Subtítulo Modulo 2',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dicta placeat numquam velit ex officia dolore quia inventore, tenetur provident sapiente quos quidem vitae repellat doloribus! Veritatis quasi quis eaque.'
  },
  {
    index: 3,
    image: '/images/cancionistica-5.jpg',
    thumb: '/images/cancionistica-5.jpg',
    title: 'Modulo 3',
    subTitle: 'Subtítulo Modulo 3',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dicta placeat numquam velit ex officia dolore quia inventore, tenetur provident sapiente quos quidem vitae repellat doloribus! Veritatis quasi quis eaque.'
  },
  {
    index: 4,
    image: '/images/cancionistica-6.jpg',
    thumb: '/images/cancionistica-6.jpg',
    title: 'Modulo 4',
    subTitle: 'Subtítulo Modulo 4',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dicta placeat numquam velit ex officia dolore quia inventore, tenetur provident sapiente quos quidem vitae repellat doloribus! Veritatis quasi quis eaque.'
  },
];

export default config;