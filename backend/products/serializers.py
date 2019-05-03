from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        #fields = '__all__'
        fields = ['title', 'description', 'content', 'category', 'slug', 'price']


