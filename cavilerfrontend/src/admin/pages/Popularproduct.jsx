// src/components/UploadScreen.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Upload,
  X,
  Image,
  Video,
  File,
  Star,
  BookOpen,
  Award,
  Calendar,
  ChevronDown,
  Youtube,
  Eye,
  Trash2
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const UploadScreen = () => {
  const [files, setFiles] = useState([]);
  const [uploadedContent, setUploadedContent] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);
  const fileInputRef = useRef(null);

  const categories = [
    {
      id: 'all',
      name: 'All',
      icon: <BookOpen className="w-4 h-4" />,
      color: 'bg-gray-100 text-gray-600 border-gray-200',
      description: 'All content categories'
    },
    {
      id: 'featured',
      name: 'Featured',
      icon: <Star className="w-4 h-4" />,
      color: 'bg-yellow-100 text-yellow-600 border-yellow-200',
      description: 'Featured and highlighted content'
    },
    {
      id: 'science',
      name: 'Science',
      icon: <Award className="w-4 h-4" />,
      color: 'bg-purple-100 text-purple-600 border-purple-200',
      description: 'Science related content and innovations'
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: <BookOpen className="w-4 h-4" />,
      color: 'bg-blue-100 text-blue-600 border-blue-200',
      description: 'Mathematics concepts and problem-solving'
    },
    {
      id: 'physics',
      name: 'Physics',
      icon: <Award className="w-4 h-4" />,
      color: 'bg-red-100 text-red-600 border-red-200',
      description: 'Physics experiments and theories'
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: <Award className="w-4 h-4" />,
      color: 'bg-green-100 text-green-600 border-green-200',
      description: 'Technology and digital innovations'
    },
    {
      id: 'events',
      name: 'Events',
      icon: <Calendar className="w-4 h-4" />,
      color: 'bg-indigo-100 text-indigo-600 border-indigo-200',
      description: 'Academy events and activities'
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      icon: <Award className="w-4 h-4" />,
      color: 'bg-orange-100 text-orange-600 border-orange-200',
      description: 'Campus infrastructure and facilities'
    },
    {
      id: 'labs',
      name: 'Labs',
      icon: <Award className="w-4 h-4" />,
      color: 'bg-teal-100 text-teal-600 border-teal-200',
      description: 'Laboratory equipment and experiments'
    },
    {
      id: 'sports',
      name: 'Sports',
      icon: <Award className="w-4 h-4" />,
      color: 'bg-emerald-100 text-emerald-600 border-emerald-200',
      description: 'Sports activities and achievements'
    },
    {
      id: 'campus',
      name: 'Campus',
      icon: <Award className="w-4 h-4" />,
      color: 'bg-pink-100 text-pink-600 border-pink-200',
      description: 'Campus life and environment'
    },
    {
      id: 'research',
      name: 'Research',
      icon: <Award className="w-4 h-4" />,
      color: 'bg-violet-100 text-violet-600 border-violet-200',
      description: 'Research projects and findings'
    },
    {
      id: 'achievements',
      name: 'Achievements',
      icon: <Award className="w-4 h-4" />,
      color: 'bg-amber-100 text-amber-600 border-amber-200',
      description: 'Academic achievements and awards'
    }
  ];

  // Fetch all uploaded content from backend
  const fetchUploadedContent = async () => {
    try {
      setLoadingContent(true);
      const response = await axios.get(`${API_BASE_URL}/api/content`);
      setUploadedContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoadingContent(false);
    }
  };

  useEffect(() => {
    fetchUploadedContent();
  }, []);

  // Upload file to backend
  const uploadFileToBackend = async (fileObj) => {
    try {
      const formData = new FormData();
      formData.append('file', fileObj.file);
      formData.append('title', fileObj.name);
      formData.append('description', fileObj.description || '');
      formData.append('category', fileObj.category);
      formData.append('content_type', fileObj.type.startsWith('image/') ? 'image' : 'video');

      const response = await axios.post(`${API_BASE_URL}/api/content`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setFiles(prev => prev.map(f =>
            f.id === fileObj.id ? { ...f, uploadProgress: progress } : f
          ));
        }
      });

      setFiles(prev => prev.map(f =>
        f.id === fileObj.id ? { ...f, status: 'completed', uploadProgress: 100 } : f
      ));

      // Refresh uploaded content after successful upload
      fetchUploadedContent();
      return response.data;
    } catch (error) {
      console.error('Upload failed:', error);
      setFiles(prev => prev.map(f =>
        f.id === fileObj.id ? { ...f, status: 'failed' } : f
      ));
      throw error;
    }
  };

  // Create YouTube content
  const createYouTubeContent = async (youtubeData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/content`, {
        title: youtubeData.name,
        description: youtubeData.description || '',
        category: youtubeData.category,
        youtube_url: youtubeData.url,
        content_type: 'youtube'
      });

      // Refresh uploaded content after successful upload
      fetchUploadedContent();
      return response.data;
    } catch (error) {
      console.error('YouTube content creation failed:', error);
      setFiles(prev => prev.map(f =>
        f.id === youtubeData.id ? { ...f, status: 'failed' } : f
      ));
      throw error;
    }
  };

  // Delete content
  const deleteContent = async (contentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/content/${contentId}`);
      fetchUploadedContent(); // Refresh the list
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Failed to delete content');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file =>
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );

    const filesWithPreview = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      uploadProgress: 0,
      status: 'pending',
      category: selectedCategory,
      description: description,
      source: 'file'
    }));

    setFiles(prev => [...prev, ...filesWithPreview]);

    filesWithPreview.forEach((fileObj) => {
      uploadFileToBackend(fileObj);
    });
  };

  const handleYoutubeSubmit = () => {
    if (!youtubeUrl.trim()) return;

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeRegex.test(youtubeUrl)) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    const youtubeFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'YouTube Video',
      type: 'video/youtube',
      size: 0,
      preview: getYouTubeThumbnail(youtubeUrl),
      uploadProgress: 100,
      status: 'pending',
      category: selectedCategory,
      description: description,
      source: 'youtube',
      url: youtubeUrl
    };

    setFiles(prev => [...prev, youtubeFile]);

    createYouTubeContent(youtubeFile)
      .then(() => {
        setFiles(prev => prev.map(f =>
          f.id === youtubeFile.id ? { ...f, status: 'completed' } : f
        ));
      })
      .catch(() => {
        // Error handled in createYouTubeContent
      });

    setYoutubeUrl('');
    setShowYoutubeInput(false);
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoId ? `https://img.youtube.com/vi/${videoId[1]}/hqdefault.jpg` : null;
  };

  const removeFile = (fileId) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview && fileToRemove.source === 'file') {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType, source) => {
    if (source === 'youtube') return <Youtube className="w-5 h-5 text-red-500" />;
    if (fileType.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (fileType.startsWith('video/')) return <Video className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitAll = async () => {
    if (files.length === 0) {
      alert('Please add some content first!');
      return;
    }

    setIsSubmitting(true);

    try {
      const pendingFiles = files.filter(f => f.status !== 'completed');
      if (pendingFiles.length > 0) {
        alert('Please wait for all files to finish uploading.');
        setIsSubmitting(false);
        return;
      }

      alert('Your educational content has been successfully shared with Vidyarjan Science Academy! 🎓');

      setFiles([]);
      setDescription('');
      setSelectedCategory('');

    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryName = (categoryId) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Uncategorized';
  };

  const getSelectedCategory = () => {
    return categories.find(cat => cat.id === selectedCategory);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'pending': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status, uploadProgress, source) => {
    if (source === 'youtube') {
      return status === 'completed' ? '✅ YouTube Video Ready' : '🔄 Processing...';
    }

    switch (status) {
      case 'completed': return '✅ Ready';
      case 'failed': return '❌ Upload Failed';
      case 'pending': return `Uploading... ${Math.round(uploadProgress)}%`;
      default: return 'Processing...';
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${API_BASE_URL.replace('/api', '')}${imageUrl}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-cavalier-bg text-white py-12 px-4 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cavalier-brand/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cavalier-brand/10 border border-cavalier-brand/30 rounded-full mb-6 shadow-2xl backdrop-blur-md">
            <BookOpen className="w-10 h-10 text-cavalier-brand" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4 italic">
            Cavalier <span className="text-transparent bg-clip-text bg-gradient-to-r from-cavalier-brand to-yellow-600">Intelligence Bureau</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Centralized database for tactical training resources, field reconnaissance, and instructional assets.
            <span className="block text-cavalier-brand font-black uppercase tracking-widest text-xs mt-4">
              Authorized Personnel Only | System Secure
            </span>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cavalier-brand to-yellow-600 mx-auto rounded-full mt-8 opacity-50"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Selection Dropdown */}
            <div className="bg-cavalier-card-dark rounded-2xl p-6 border border-cavalier-header-bg shadow-2xl backdrop-blur-md">
              <h2 className="text-xl font-black uppercase tracking-tighter italic text-white mb-6 flex items-center justify-center gap-3">
                <BookOpen className="w-5 h-5 text-cavalier-brand" />
                Select Mission Category
              </h2>

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white hover:border-blue-300 transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    {selectedCategory ? (
                      <>
                        <div className={`p-2 rounded-lg ${getSelectedCategory()?.color}`}>
                          {getSelectedCategory()?.icon}
                        </div>
                        <div className="text-left">
                          <span className="font-medium text-gray-800 block">
                            {getSelectedCategory()?.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {getSelectedCategory()?.description}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-500">Choose a category for your content...</span>
                    )}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-80 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full p-4 text-left border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3 ${selectedCategory === category.id ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                      >
                        <div className={`p-2 rounded-lg ${category.color}`}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{category.name}</div>
                          <div className="text-sm text-gray-500 mt-1">{category.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description Input */}
            {selectedCategory && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Educational Description 📝
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={`Describe this ${getSelectedCategory()?.name.toLowerCase()} content... What educational value does it provide? What concepts does it demonstrate?`}
                  className="w-full h-24 px-4 py-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {description.length}/500 characters
                  </span>
                  <span className="text-xs text-blue-500">
                    💡 Explain the educational context
                  </span>
                </div>
              </div>
            )}

            {/* Upload Options */}
            {selectedCategory && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 transform ${isDragging
                    ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
                    : 'border-blue-200 bg-white/80 hover:border-blue-400 hover:shadow-md'
                    } backdrop-blur-sm shadow-sm`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                    <Upload className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Upload Files
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm">
                    Drag & Drop photos and videos
                  </p>

                  <button
                    onClick={handleUploadClick}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                  >
                    Choose Files
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />

                  <p className="text-xs text-gray-500 mt-3">
                    Supports JPG, PNG, MP4, MOV up to 100MB
                  </p>
                </div>

                {/* YouTube URL Area */}
                <div className="border-2 border-dashed border-red-200 rounded-2xl p-6 text-center bg-white/80 backdrop-blur-sm hover:border-red-300 hover:shadow-md transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    YouTube Video
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm">
                    Add educational videos from YouTube
                  </p>

                  {!showYoutubeInput ? (
                    <button
                      onClick={() => setShowYoutubeInput(true)}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                    >
                      Add YouTube URL
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <input
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="Paste YouTube URL here..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={handleYoutubeSubmit}
                          className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors text-sm"
                        >
                          Add Video
                        </button>
                        <button
                          onClick={() => setShowYoutubeInput(false)}
                          className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-3">
                    Any public YouTube educational content
                  </p>
                </div>
              </div>
            )}

            {/* Uploaded Files List */}
            {files.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
                    Uploading Content ({files.length})
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-blue-600">
                    <Star className="w-4 h-4" />
                    <span>Sharing knowledge</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {files.map((fileObj) => (
                    <div
                      key={fileObj.id}
                      className="flex items-center justify-between p-4 border border-blue-100 rounded-xl hover:bg-blue-50/50 transition-all duration-200 bg-white/50"
                    >
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="flex-shrink-0 relative">
                          {fileObj.preview ? (
                            <div className="relative">
                              <img
                                src={fileObj.preview}
                                alt={fileObj.name}
                                className="w-14 h-14 object-cover rounded-lg shadow-sm"
                              />
                              {fileObj.source === 'youtube' && (
                                <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                                  <Youtube className="w-6 h-6 text-red-600" />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center shadow-sm">
                              {getFileIcon(fileObj.type, fileObj.source)}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <p className="font-semibold text-gray-800 truncate">
                                  {fileObj.name}
                                </p>
                                {fileObj.source === 'youtube' && (
                                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                    YouTube
                                  </span>
                                )}
                              </div>
                              {fileObj.category && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 mt-1">
                                  {getCategoryName(fileObj.category)}
                                </span>
                              )}
                            </div>
                            {fileObj.source === 'file' && (
                              <span className="text-sm text-gray-500 ml-2 whitespace-nowrap">
                                {formatFileSize(fileObj.size)}
                              </span>
                            )}
                          </div>

                          {fileObj.source === 'file' && (
                            <>
                              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div
                                  className={`h-2 rounded-full transition-all duration-300 ${fileObj.status === 'completed'
                                    ? 'bg-gradient-to-r from-green-400 to-green-500'
                                    : fileObj.status === 'failed'
                                      ? 'bg-gradient-to-r from-red-400 to-red-500'
                                      : 'bg-gradient-to-r from-blue-400 to-purple-400'
                                    }`}
                                  style={{ width: `${fileObj.uploadProgress}%` }}
                                />
                              </div>
                            </>
                          )}

                          <div className="flex justify-between items-center">
                            <span className={`text-sm font-medium ${getStatusColor(fileObj.status)}`}>
                              {getStatusText(fileObj.status, fileObj.uploadProgress, fileObj.source)}
                            </span>
                            <span className="text-xs text-gray-400 capitalize flex items-center">
                              {fileObj.type.startsWith('image/') ? '📸 Photo' :
                                fileObj.type.startsWith('video/') ? '🎥 Video' :
                                  '📺 YouTube'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFile(fileObj.id)}
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg"
                        disabled={fileObj.status === 'pending'}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-blue-100">
                  <div className="text-sm text-gray-600">
                    <span className="text-blue-600 font-medium">🎓 Educational Tip:</span> Add detailed descriptions for better learning
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setFiles([])}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={handleSubmitAll}
                      disabled={isSubmitting || files.some(f => f.status !== 'completed')}
                      className="px-8 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
                    >
                      {isSubmitting ? 'Sharing...' : 'Share Content 🎓'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Uploaded Content Display */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Eye className="w-6 h-6 mr-2 text-green-500" />
                  Uploaded Content
                </h2>
                <button
                  onClick={fetchUploadedContent}
                  className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                  title="Refresh"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              {loadingContent ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : uploadedContent.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-2">No content uploaded yet</p>
                  <p className="text-gray-400 text-sm">Upload some educational content to see it here</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {uploadedContent.map((content) => (
                    <div key={content.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 relative">
                          {content.content_type === 'youtube' ? (
                            <div className="w-16 h-16 bg-red-100 rounded-lg overflow-hidden relative">
                              <img
                                src={content.youtube_thumbnail || getYouTubeThumbnail(content.youtube_url)}
                                alt={content.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                                <Youtube className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          ) : content.content_type === 'image' ? (
                            <div className="w-16 h-16 bg-blue-100 rounded-lg overflow-hidden">
                              <img
                                src={getImageUrl(content.file_url)}
                                alt={content.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Video className="w-6 h-6 text-purple-600" />
                            </div>
                          )}
                        </div>

                        {/* Content Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                            {content.title}
                          </h3>
                          <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                            {content.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${categories.find(cat => cat.id === content.category)?.color || 'bg-gray-100 text-gray-600'
                                }`}>
                                {getCategoryName(content.category)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(content.createdAt)}
                              </span>
                            </div>

                            <button
                              onClick={() => deleteContent(content.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {uploadedContent.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-center text-sm text-gray-500">
                    Total: {uploadedContent.length} items
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Inspiration Quote */}
        <div className="text-center mt-12 pb-8 border-t border-white/5 pt-8">
          <p className="text-gray-500 italic text-sm font-mono tracking-wide">
            "Discipline and knowledge are the foundation of a successful officer."
            <span className="block text-cavalier-brand font-black uppercase tracking-widest text-[10px] mt-2">
              - Cavalier Defence Academy Command
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadScreen;
