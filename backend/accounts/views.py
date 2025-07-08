from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')
    
    if not username or not password:
        return Response({"error": "Username and password are required."}, status=400)

    if password != confirm_password:
        return Response({"error": "Passwords do not match."}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists."}, status=400)
    
    user = User.objects.create_user(username=username, password=password)
    return Response({"message": "User created successfully."}, status=201)

def login_user(request):
    return Response({"message": "Login endpoint not implemented."}, status=status.HTTP_501_NOT_IMPLEMENTED)