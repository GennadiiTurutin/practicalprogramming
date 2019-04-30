from rest_framework import serializers
from profiles.models import Profile

# Lead Serializer
class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile 
    fields = '__all__'