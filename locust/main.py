from locust import HttpUser, task
from json import JSONDecodeError


class GoUser(HttpUser):
    @task
    def go_form(self):
        self.client.get("/go/sha256")

 
    @task
    def go_sha_api(self):
        with self.client.post("/go/sha", json={"String": "first_test_string"}, catch_response=True) as res:
            try:
                hash_value = res.json()["sha256"]
                self.client.get(f"/go/sha?hash_value={hash_value}")
            except JSONDecodeError:
                res.failure("Response could not be decoded as JSON")
            except KeyError:
                res.failure("Response did not contain expected key 'greeting'")


class NodeUser(HttpUser):
    @task
    def node_form(self):
        self.client.get("/node/sha256")

 
    @task
    def node_sha_api(self):
        with self.client.post("/node/sha", json={"string": "first_test_string"}, catch_response=True) as res:
            try:
                hash_value = res.json()["sha256"]
                self.client.get(f"/node/sha?hash_value={hash_value}")
            except JSONDecodeError:
                res.failure("Response could not be decoded as JSON")
            except KeyError:
                res.failure("Response did not contain expected key 'greeting'")
