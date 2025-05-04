export async function load({ url: { searchParams }, setHeaders }) {

    setHeaders({
		'cache-control': 'private, max-age=3600'
	});
     
	 return {
        month: searchParams.get("month") ?? ""
	 };
}

