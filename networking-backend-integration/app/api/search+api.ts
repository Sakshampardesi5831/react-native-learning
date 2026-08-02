export async  function GET(request:Request){
    // query params
    const url = new URL(request.url);
    const query = url.searchParams.get("q");
    return Response.json({
        data:query
    })
}