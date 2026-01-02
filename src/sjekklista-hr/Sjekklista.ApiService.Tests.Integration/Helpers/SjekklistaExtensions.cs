namespace Sjekklista.ApiService.Tests.Integration.Helpers
{
    public static class SjekklistaExtensions
    {
        public static async Task<TResult> As<TResult>(this Task<HttpResponseMessage> httpResponseTask)
        {
            await httpResponseTask;
            return await httpResponseTask.Result.Content!.ReadFromJsonAsync<TResult>() ?? throw new Exception("");
        }
    }
}
