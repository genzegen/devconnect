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

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    if not user.check_password(password):
        return Response({"error": "Incorrect password."}, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response({"message": "Login successful."}, status=status.HTTP_200_OK)

api_view(['POST'])
def home_view(request):
    if request.method == 'POST':
        return Response({"message": "Welcome to the home page!"}, status=status.HTTP_200_OK)


