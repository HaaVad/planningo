export const GET = async (request: Request, res: Response) => {
    console.log("GET");
}

export const POST = async (request: Request, res: Response) => {
    console.log("POST ");
}
 
export async function HEAD(request: Request) {}
 
 
export async function PUT(request: Request) {}
 
export async function DELETE(request: Request) {}
 
export async function PATCH(request: Request) {}
 
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}