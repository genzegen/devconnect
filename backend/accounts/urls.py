from django.contrib import admin
from django.urls import path
from accounts.views import *

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('home/', home_view, name='home'),
]
