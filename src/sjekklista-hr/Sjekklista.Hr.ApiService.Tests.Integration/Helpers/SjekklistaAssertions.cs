using Microsoft.AspNetCore.Mvc;

namespace Sjekklista.Hr.ApiService.Tests.Integration.Helpers
{
    public static class SjekklistaAssertions
    {
        public static async Task Assert200OkResponse(this HttpResponseMessage response)
        {
            string responseContent = await response.Content.ReadAsStringAsync();
            Assert.True(response.IsSuccessStatusCode, $"Expected 200 OK but got {(int)response.StatusCode}. Response content: {responseContent}");
        }

        public static async Task<ValidationProblemDetails> Assert400BadRequest(this HttpResponseMessage response)
        {
            Assert.Equal(System.Net.HttpStatusCode.BadRequest, response.StatusCode);

            return (await response.Content!.ReadFromJsonAsync<ValidationProblemDetails>())!;
        }
    }
}
