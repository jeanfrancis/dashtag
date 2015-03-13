require_dependency "dashtag/application_controller"

module Dashtag
  class FeedController < ApplicationController

    include PostHelper
    include ActionView::Helpers::UrlHelper

    def index
      @posts = Post.limited_sorted_posts(100)
    end

    def get_next_page
      @posts = Post.next_posts(Post.find(params[:last_post_id]), 100)
      render partial: "posts"
    end

    def get_latest_posts
      @posts = Post.get_new_posts(convert_to_seconds(params[:last_update_time]))
      render partial: "posts"
    end

    private
    def convert_to_seconds(time)
      time.to_f/1000
    end
  end
end
