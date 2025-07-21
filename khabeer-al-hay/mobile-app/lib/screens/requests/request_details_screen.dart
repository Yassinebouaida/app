import 'package:flutter/material.dart';

class RequestDetailsScreen extends StatelessWidget {
  const RequestDetailsScreen({super.key, required this.requestId});
  
  final String requestId;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('RequestDetailsScreen'),
      ),
      body: const Center(
        child: Text('RequestDetailsScreen - قيد التطوير'),
      ),
    );
  }
}
