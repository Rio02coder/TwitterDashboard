from core.Twitter_api.api_registration import client


def get_twitter_user_id(name: str):
    try:
        return client.get_user(username=name).data.id

    except Exception as e:
        print(e)
        return ValueError("An error occurred with the api / username")
