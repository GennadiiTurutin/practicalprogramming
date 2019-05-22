from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, ChangePasswordSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated 
#from profiles.models import Profile

# Register API
class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()
    return Response({
      "id": UserSerializer(user, context=self.get_serializer_context()).data["id"],
      "username": UserSerializer(user, context=self.get_serializer_context()).data["username"],
      "email": UserSerializer(user, context=self.get_serializer_context()).data["email"],
      "user": UserSerializer(user, context=self.get_serializer_context()).data["user"],
      "products": user.user.products.values('id'),
      "authenticated": True,
      "token": AuthToken.objects.create(user)[1]
    })


# Login API
class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer
  
  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data

    return Response({
      "id": UserSerializer(user, context=self.get_serializer_context()).data["id"],
      "username": UserSerializer(user, context=self.get_serializer_context()).data["username"],
      "email": UserSerializer(user, context=self.get_serializer_context()).data["email"],
      "user": UserSerializer(user, context=self.get_serializer_context()).data["user"],
      "authenticated": True,
      "products": user.user.products.values('id'),
      "token": AuthToken.objects.create(user)[1]
    })

# Get User API
class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.object.set_password(serializer.data.get("password"))
            self.object.username = serializer.data.get("username")
            self.object.email = serializer.data.get("email")
            self.object.save()

            return Response({
              "id": UserSerializer(self.object, context=self.get_serializer_context()).data["id"],
              "username": UserSerializer(self.object, context=self.get_serializer_context()).data["username"],
              "email": UserSerializer(self.object, context=self.get_serializer_context()).data["email"],
              "user": UserSerializer(self.object, context=self.get_serializer_context()).data["user"],
              "products": self.object.user.products.values('id'),
              "authenticated": True,
              "token": AuthToken.objects.create(self.object)[1]
            })