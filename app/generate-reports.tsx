
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { useRouter, Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

type ReportFormat = 'excel' | 'powerbi';

export default function GenerateReportsScreen() {
  const router = useRouter();
  const [selectedFormat, setSelectedFormat] = useState<ReportFormat>('excel');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedFiles, setGeneratedFiles] = useState<string[]>([]);

  const formats = [
    {
      id: 'excel' as ReportFormat,
      title: 'Excel',
      description: 'فایل اکسل قابل ویرایش',
      icon: 'doc.text.fill',
      color: colors.primary,
    },
    {
      id: 'powerbi' as ReportFormat,
      title: 'Power BI',
      description: 'فایل آماده برای Power BI',
      icon: 'chart.bar.doc.horizontal.fill',
      color: colors.secondary,
    },
  ];

  const generateReport = async () => {
    setIsGenerating(true);
    setProgress(0);
    console.log('Starting report generation:', selectedFormat);

    // Simulate report generation with progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate file generation
    setTimeout(async () => {
      clearInterval(progressInterval);
      setProgress(100);
      
      // Create sample report content
      const reportContent = generateSampleReportContent();
      const fileName = `report_${Date.now()}.${selectedFormat === 'excel' ? 'xlsx' : 'pbix'}`;
      // eslint-disable-next-line import/namespace
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      try {
        // In a real app, you would generate actual Excel/PowerBI files here
        // eslint-disable-next-line import/namespace
        await FileSystem.writeAsStringAsync(fileUri, reportContent, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        
        setGeneratedFiles(prev => [...prev, fileUri]);
        setIsGenerating(false);
        
        Alert.alert(
          'موفق',
          'گزارش با موفقیت تولید شد',
          [
            {
              text: 'مشاهده',
              onPress: () => console.log('View report:', fileUri),
            },
            {
              text: 'اشتراک‌گذاری',
              onPress: () => shareFile(fileUri),
            },
            {
              text: 'بستن',
              style: 'cancel',
            }
          ]
        );
      } catch (error) {
        console.error('Error generating report:', error);
        setIsGenerating(false);
        Alert.alert('خطا', 'خطا در تولید گزارش');
      }
    }, 3000);
  };

  const generateSampleReportContent = () => {
    return `
گزارش حسابداری
تاریخ: ${new Date().toLocaleDateString('fa-IR')}
فرمت: ${selectedFormat}

داده‌های نمونه:
- فروش کل: 1,250,000,000 ریال
- خرید کل: 850,000,000 ریال
- سود خالص: 400,000,000 ریال
- موجودی انبار: 150 قلم

این یک فایل نمونه است. در نسخه واقعی، داده‌های واقعی از دیتابیس استخراج می‌شود.
    `.trim();
  };

  const shareFile = async (fileUri: string) => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(fileUri);
        console.log('File shared successfully');
      } else {
        Alert.alert('خطا', 'امکان اشتراک‌گذاری در این دستگاه وجود ندارد');
      }
    } catch (error) {
      console.error('Error sharing file:', error);
      Alert.alert('خطا', 'خطا در اشتراک‌گذاری فایل');
    }
  };

  const downloadFile = async (fileUri: string) => {
    try {
      // On mobile, files are already saved to the device
      Alert.alert('موفق', 'فایل در دستگاه شما ذخیره شده است');
      console.log('File location:', fileUri);
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert('خطا', 'خطا در دانلود فایل');
    }
  };

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => router.back()}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="chevron.right" color={colors.primary} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "تولید گزارشات",
          headerLeft: renderHeaderLeft,
          presentation: 'modal',
        }}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconSymbol name="doc.text.fill" color={colors.primary} size={48} />
            <Text style={styles.headerTitle}>تولید گزارشات</Text>
            <Text style={styles.headerSubtitle}>
              فرمت خروجی گزارش را انتخاب کنید
            </Text>
          </View>

          <View style={styles.formatSelector}>
            {formats.map((format) => {
              const isSelected = selectedFormat === format.id;
              return (
                <Pressable
                  key={format.id}
                  style={[
                    styles.formatCard,
                    isSelected && styles.formatCardSelected
                  ]}
                  onPress={() => setSelectedFormat(format.id)}
                >
                  <View style={[styles.formatIcon, { backgroundColor: format.color }]}>
                    <IconSymbol name={format.icon as any} color="white" size={32} />
                  </View>
                  <Text style={styles.formatTitle}>{format.title}</Text>
                  <Text style={styles.formatDescription}>{format.description}</Text>
                  <View style={[
                    styles.radioButton,
                    isSelected && styles.radioButtonSelected
                  ]}>
                    {isSelected && <View style={styles.radioButtonInner} />}
                  </View>
                </Pressable>
              );
            })}
          </View>

          {isGenerating && (
            <View style={styles.progressCard}>
              <Text style={styles.progressText}>در حال تولید گزارش...</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressPercentage}>{progress}%</Text>
            </View>
          )}

          <Pressable
            style={[styles.generateButton, isGenerating && styles.generateButtonDisabled]}
            onPress={generateReport}
            disabled={isGenerating}
          >
            <Text style={styles.generateButtonText}>
              {isGenerating ? 'در حال تولید...' : 'تولید گزارش'}
            </Text>
            <IconSymbol name="arrow.down.doc.fill" color="white" size={20} />
          </Pressable>

          {generatedFiles.length > 0 && (
            <View style={styles.filesSection}>
              <Text style={styles.filesSectionTitle}>فایل‌های تولید شده</Text>
              {generatedFiles.map((fileUri, index) => (
                <View key={index} style={styles.fileCard}>
                  <View style={styles.fileInfo}>
                    <IconSymbol name="doc.fill" color={colors.primary} size={24} />
                    <Text style={styles.fileName} numberOfLines={1}>
                      {fileUri.split('/').pop()}
                    </Text>
                  </View>
                  <View style={styles.fileActions}>
                    <Pressable
                      style={styles.fileActionButton}
                      onPress={() => shareFile(fileUri)}
                    >
                      <IconSymbol name="square.and.arrow.up" color={colors.primary} size={20} />
                    </Pressable>
                    <Pressable
                      style={styles.fileActionButton}
                      onPress={() => downloadFile(fileUri)}
                    >
                      <IconSymbol name="arrow.down.circle" color={colors.secondary} size={20} />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={styles.infoCard}>
            <IconSymbol name="info.circle.fill" color={colors.primary} size={24} />
            <Text style={styles.infoText}>
              فایل‌های تولید شده را می‌توانید دانلود کرده یا از طریق ایمیل، تلگرام و سایر برنامه‌ها ارسال کنید.
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  formatSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  formatCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  formatCardSelected: {
    borderColor: colors.primary,
    boxShadow: '0px 4px 8px rgba(41, 128, 185, 0.2)',
    elevation: 4,
  },
  formatIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  formatTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  formatDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  generateButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(41, 128, 185, 0.3)',
    elevation: 4,
  },
  generateButtonDisabled: {
    opacity: 0.6,
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginRight: 8,
  },
  filesSection: {
    marginBottom: 24,
  },
  filesSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'right',
  },
  fileCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  fileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  fileName: {
    fontSize: 14,
    color: colors.text,
    marginRight: 12,
    flex: 1,
  },
  fileActions: {
    flexDirection: 'row',
    gap: 8,
  },
  fileActionButton: {
    padding: 8,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    marginRight: 12,
    textAlign: 'right',
    lineHeight: 18,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
