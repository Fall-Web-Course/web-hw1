from locust import HttpUser, task
from json import JSONDecodeError


class GoUser(HttpUser):
    @task
    def go_form(self):
        self.client.get("/go/sha256")

 
    @task
    def go_sha_api(self):
        with self.client.post("/sha", json={"String": "first_test_string"}, catch_response=True) as res:
            try:
                hash_value = res.json()["sha256"]
                self.client.get(f"/sha?hash_text{hash_value}")
            except JSONDecodeError:
                response.failure("Response could not be decoded as JSON")
            except KeyError:
                response.failure("Response did not contain expected key 'greeting'")
