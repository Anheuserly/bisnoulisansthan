declare module "@svg-maps/world" {
  export interface WorldLocation {
    id: string;
    name: string;
    path: string;
  }
  const World: {
    label: string;
    viewBox: string;
    locations: WorldLocation[];
  };
  export default World;
}

declare module "@svg-maps/india" {
  export interface IndiaLocation {
    id: string;
    name: string;
    path: string;
  }
  const India: {
    label: string;
    viewBox: string;
    locations: IndiaLocation[];
  };
  export default India;
}
