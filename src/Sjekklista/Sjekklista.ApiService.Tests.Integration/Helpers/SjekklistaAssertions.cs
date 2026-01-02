namespace Sjekklista.ApiService.Tests.Integration.Helpers
{
    public static class SjekklistaAssertions
    {
        public static async Task Assert200OkResponse(this HttpResponseMessage response)
        {
            string responseContent = await response.Content.ReadAsStringAsync();
            Assert.True(response.IsSuccessStatusCode, $"Expected 200 OK but got {(int)response.StatusCode}. Response content: {responseContent}");
        }
    }
}
