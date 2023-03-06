"""Tweetics URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/signup/', views.SignUpView.as_view(), name="sign_up"),
    path('user/token/refresh/', views.RefreshTokenView.as_view(), name="refresh_token"),
    path('user/tweets/<str:force_update>/', views.RecentTweetsView.as_view(), name="recent_tweets"),
    path('user/tweets_last_month/', views.LastMonthTweetsView.as_view(), name="last_month_tweets"),
    path('user/login/', views.UserAuthTokenView.as_view(), name="user_login"),
    path('user/logout/', views.LogOutView.as_view(), name="user_logout"),
    path('demo/', views.DemoView.as_view(), name="demo_view")
]
